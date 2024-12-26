FROM openjdk:17-jdk-alpine
ARG JAR_FILE = target/*.jar
COPY ./target/spring-boot-docker.jar app.jar
# EXPOSE 8080
# ADD target/spring-boot-docker.jar spring-boot-docker.jar
ENTRYPOINT ["java","-jar","/app.jar"]