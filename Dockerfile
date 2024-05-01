# Use an official OpenJDK runtime as a parent image
FROM amazoncorretto:17.0.7

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container at /app
COPY build/libs/nova_films-0.0.1-SNAPSHOT.jar /app/nova_films.jar
# Adjust the path as necessary

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "nova_films.jar"]
