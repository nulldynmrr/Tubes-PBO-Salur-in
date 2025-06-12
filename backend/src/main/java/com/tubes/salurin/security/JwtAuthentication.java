package com.tubes.salurin.security;

import com.tubes.salurin.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthentication extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // 1. Ambil JWT dari request
            String jwt = getJwtFromRequest(request);

            // 2. Validasi token
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // 3. Ambil username (email) dari token
                String username = tokenProvider.getUsernameFromJWT(jwt);

                // 4. Ambil detail user dari database
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                
                // 5. Buat objek otentikasi
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. Set otentikasi di SecurityContext, menandakan user sudah login
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            // Jika ada error, tidak perlu melakukan apa-apa, request akan dianggap tidak terotentikasi
            logger.error("Could not set user authentication in security context", ex);
        }

        // Lanjutkan request ke filter berikutnya dalam chain
        filterChain.doFilter(request, response);
    }

    // Helper method untuk mengambil token dari header "Authorization"
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
