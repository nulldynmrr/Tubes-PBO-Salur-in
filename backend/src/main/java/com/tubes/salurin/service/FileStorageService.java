package com.tubes.salurin.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String save(MultipartFile file, String subDir) throws IOException;
    void delete(String relativePath) throws IOException;
}
