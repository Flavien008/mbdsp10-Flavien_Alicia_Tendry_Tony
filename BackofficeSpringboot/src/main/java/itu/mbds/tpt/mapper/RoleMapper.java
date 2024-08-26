package itu.mbds.tpt.mapper;

import itu.mbds.tpt.dto.RoleDto;
import itu.mbds.tpt.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
    public Role toRole(RoleDto roleDto) {
        return Role.builder()
                .id(roleDto.getId())
                .nom(roleDto.getNom())
                .build();
    }

    public RoleDto toRoleDto(Role role) {
        return RoleDto.builder()
                .id(role.getId())
                .nom(role.getNom())
                .build();
    }

}
