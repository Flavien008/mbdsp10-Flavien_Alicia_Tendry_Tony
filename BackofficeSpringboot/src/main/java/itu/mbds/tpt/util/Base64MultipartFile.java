package itu.mbds.tpt.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Base64;

public class Base64MultipartFile implements MultipartFile {

    private final byte[] content;
    private final String name;
    private final String originalFileName;
    private final String contentType;

    public Base64MultipartFile(String content, String name, String originalFileName, String contentType) {
        this.content = Base64.getDecoder().decode(content);
        this.name = name;
        this.originalFileName = originalFileName;
        this.contentType = contentType;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getOriginalFilename() {
        return originalFileName;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return content.length == 0;
    }

    @Override
    public long getSize() {
        return content.length;
    }

    @Override
    public byte[] getBytes() throws IOException {
        return content;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(content);
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        try (OutputStream os = new FileOutputStream(dest)) {
            os.write(content);
        }
    }
}

