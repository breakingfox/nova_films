package com.example.nova_films;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;

@SpringBootApplication
public class NovaFilmsApplication {

	public static void main(String[] args) {
//		try {
			SpringApplication.run(NovaFilmsApplication.class, args);

			// Check if 'npm' is in the system's PATH
//			if (isNpmInstalled()) {
//				ProcessBuilder processBuilder = new ProcessBuilder("npm.cmd", "start");
//				processBuilder.directory(new File("src/main/untitled4/")); // Set the working directory
//				processBuilder.inheritIO(); // Redirect input/output to the current process
//				Process process = processBuilder.start();
//				process.waitFor(); // Wait for the Angular server to start
//			} else {
//				System.out.println("npm is not installed or not in the system's PATH.");
//			}
//		} catch (IOException | InterruptedException e) {
//			e.printStackTrace();
//		}
	}

	private static boolean isNpmInstalled() {
		try {
			ProcessBuilder processBuilder = new ProcessBuilder("npm.cmd", "-v");
			Process process = processBuilder.start();
			int exitCode = process.waitFor();
			return exitCode == 0; // If exit code is 0, npm is installed
		} catch (IOException | InterruptedException e) {
			return false; // An exception occurred, npm is not installed
		}
	}
}
