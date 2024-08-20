package itu.mbds.tpt.security;



import itu.mbds.tpt.security.service.CustomUserDetailsService;
import itu.mbds.tpt.util.Constante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@Order(1)
public class SecurityConfiguration {

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Autowired
    PasswordConfiguration passwordConfiguration;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // @formatter:off
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/resources/**","/css/**", "/js/**", "/images/**", "/plugins/**","/login").permitAll()
                        .requestMatchers("/").hasRole(Constante.ROLE_ADMIN)
                        .requestMatchers("/categorie/**").hasRole(Constante.ROLE_ADMIN)
                        .requestMatchers("/utilisateur/**").hasRole(Constante.ROLE_ADMIN)
                        .requestMatchers("/post/**").hasRole(Constante.ROLE_ADMIN)
                        .requestMatchers("/objet/**").hasRole(Constante.ROLE_ADMIN)
                        .requestMatchers("/objet/**").hasRole(Constante.ROLE_ADMIN)
                        .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/", true)
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(withDefaults())
                .exceptionHandling((exceptions) -> exceptions
                        .accessDeniedPage("/login?errorAccess=true")
                )
                .httpBasic(withDefaults());
        // @formatter:on
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordConfiguration.passwordEncoder());
        return new ProviderManager(authenticationProvider);
    }


}