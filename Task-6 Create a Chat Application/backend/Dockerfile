FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first (layer caching)
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/vskconnect-0.0.1-SNAPSHOT.jar app.jar

# Expose both Spring Boot and Socket.IO ports
EXPOSE 8080 9092

ENTRYPOINT ["java", "-jar", "app.jar"]
