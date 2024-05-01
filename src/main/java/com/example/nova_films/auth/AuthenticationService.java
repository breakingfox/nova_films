package com.example.nova_films.auth;

import com.example.nova_films.entity.Role;
import com.example.nova_films.entity.User;
import com.example.nova_films.repository.UserRepository;
import com.example.nova_films.security.JwtUtilities;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtUtilities jwtUtilities;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsManager userDetailsManager;

    @Nullable
    public AuthenticationResponse register(RegisterRequest request) {
        User user = userRepository.findByusername(request.getUserName());
        if (user != null) {
            return null;
        }

        Role role = request.getRole();

        if (role == null) {
            role = Role.USER;
        }

        user = User.builder()
                .name(request.getName())
                .username(request.getUserName())
                .password(passwordEncoder.encode(request.getUserPassword()))
                .role(role)
                .build();
        var savedUser = userRepository.save(user);
        userDetailsManager.createUser(savedUser);
        var jwtToken = jwtUtilities.generateToken(user.getUsername(), user.getRole());

        return AuthenticationResponse.builder()
                .user(user)
                .jwtToken(jwtToken)
                .build();
    }

    //
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getUserPassword()
                )
        );
        var user = userRepository.findByusername(request.getUserName());
        var jwtToken = jwtUtilities.generateToken(user.getUsername(), user.getRole());
//        var refreshToken = jwtTokenService.generateRefreshToken(user);
//        revokeAllUserTokens(user);
//        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .user(user)
                .jwtToken(jwtToken)
                .build();
    }

    //
//    private void saveUserToken(User user, String jwtToken) {
//        var token = Token.builder()
//                .user(user)
//                .token(jwtToken)
//                .tokenType(TokenType.BEARER)
//                .expired(false)
//                .revoked(false)
//                .build();
//        jwtToken.save(token);
//    }
//
//    private void revokeAllUserTokens(User user) {
//        var validUserTokens = jwtTokenRepository.findAllValidTokenByUser(user.getId());
//        if (validUserTokens.isEmpty())
//            return;
//        validUserTokens.forEach(token -> {
//            token.setExpired(true);
//            token.setRevoked(true);
//        });
//        jwtTokenRepository.saveAll(validUserTokens);
//    }
//
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        final String refreshToken;
//        final String userusername;
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        refreshToken = authHeader.substring(7);
//        userusername = jwtUtilities.extractUsername(refreshToken);
//        if (userusername != null) {
//            var user = userRepository.findByusername(userusername);
//            if (jwtUtilities.validateToken(refreshToken)) {
//                var accessToken = jwtUtilities.generateToken(user.getUsername(), user.getRole());
////                revokeAllUserTokens(user);
////                saveUserToken(user, accessToken);
//                var authResponse = AuthenticationResponse.builder()
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build();
//                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
//            }
//        }
//    }
}