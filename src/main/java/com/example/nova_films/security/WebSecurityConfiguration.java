package com.example.nova_films.security;

import com.example.nova_films.entity.Image;
import com.example.nova_films.entity.Role;
import com.example.nova_films.entity.User;
import com.example.nova_films.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
@Slf4j
public class WebSecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtUtilities jwtUtilities;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/login").permitAll()
                .requestMatchers("/api/*/auth/**", "/*.html", "/*.ico", "/*.js", "/*.css").permitAll()
                .requestMatchers("/index.html").permitAll()
                .requestMatchers("/authenticate").permitAll()
                .requestMatchers("/register").permitAll()
                .requestMatchers("/user/**").permitAll()
                .requestMatchers("/home/**").permitAll()
                .requestMatchers("/admin/**").hasAuthority("ADMIN")
                //todo REMOVE after TESTING
                .requestMatchers("/**").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UserDetailsService inMemoryUserDetailsService(UserRepository userRepository) {
        InMemoryUserDetailsManager userDetailsManager = new InMemoryUserDetailsManager();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        User admin = userRepository.findByusername("admin");

        if (admin == null) {
            admin = new User();
            admin.setUsername("admin");
            admin.setPassword(bCryptPasswordEncoder.encode("admin"));
            admin.setName("admin");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }

        User user = userRepository.findByusername("user");

        if (user == null) {
            user = new User();
            user.setUsername("user");
            user.setPassword(bCryptPasswordEncoder.encode("user"));
            user.setName("user");
            user.setRole(Role.USER);
            userRepository.save(user);
        }

        userDetailsManager.createUser(user);
        userDetailsManager.createUser(admin);

        return userDetailsManager;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
