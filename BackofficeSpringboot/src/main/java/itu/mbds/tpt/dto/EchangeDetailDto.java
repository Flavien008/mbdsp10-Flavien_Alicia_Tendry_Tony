package itu.mbds.tpt.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EchangeDetailDto {

    private int id;
    private int echangeId;
    private int objetId;
    private ObjetDto objet;
    private String image;
}
