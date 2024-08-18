package itu.mbds.tpt.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    private String id;
    private int itemId;
    private String img;
}

