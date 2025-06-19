package com.tubes.salurin.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tubes.salurin.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    @Value("${salurin.upload-dir:uploads/}")
    private String baseDir;

    @Override
    public String save(MultipartFile file, String subDir) throws IOException{
        if (file == null || file.isEmpty()) return null;

        Path targetDir = Paths.get(baseDir, subDir).toAbsolutePath().normalize();
        Files.createDirectories(targetDir);

        String cleanName = Path.of(file.getOriginalFilename())
                               .getFileName().toString().replace(' ', '_');
        String fileName  = UUID.randomUUID() + "-" + cleanName;

        Path dest = targetDir.resolve(fileName);
        file.transferTo(dest);

        return Paths.get(baseDir, subDir, fileName).toString().replace('\\', '/');
    }

    @Override
    public void delete(String relativePath) throws IOException{
        if (relativePath == null || relativePath.isBlank()) return;
        Files.deleteIfExists(Paths.get(relativePath).toAbsolutePath());
    }
}
