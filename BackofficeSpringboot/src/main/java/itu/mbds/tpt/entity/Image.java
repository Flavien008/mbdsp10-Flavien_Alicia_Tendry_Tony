package itu.mbds.tpt.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    private String id;
    @Field("item_id")
    private int itemId;
    private String img;
}

