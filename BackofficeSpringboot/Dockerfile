# Étape 1 : Utiliser une image Gradle pour construire le JAR
FROM gradle:7.5.1-jdk17 AS build
WORKDIR /home/gradle/project
COPY . .
RUN gradle bootJar

# Étape 2 : Utiliser une image légère pour exécuter l'application
FROM azul/zulu-openjdk:17-latest
VOLUME /tmp
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
