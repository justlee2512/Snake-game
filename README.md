# Heart Animation Project

This is a Spring Boot project that demonstrates a heart animation using HTML5 canvas and JavaScript. The project serves a simple web application that displays a heart animation on the screen.

## Project Structure

```
heart-animation
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── blackhat
│   │   │           └── heartanimation
│   │   │               ├── HeartAnimationApplication.java
│   │   │               └── controller
│   │   │                   └── HeartController.java
│   │   ├── resources
│   │   │   ├── static
│   │   │   │   └── heart.html
│   │   │   └── application.properties
│   └── test
│       └── java
│           └── com
│               └── blackhat
│                   └── heartanimation
│                       └── HeartAnimationApplicationTests.java
├── pom.xml
└── README.md
```

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Build and Run

1. Clone the repository:
   ```
   git clone <repository-url>
   cd heart-animation
   ```

2. Build the project using Maven:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

4. Open your web browser and navigate to:
   ```
   http://localhost:8080
   ```

## Description

- **HeartAnimationApplication.java**: The main entry point of the Spring Boot application.
- **HeartController.java**: A controller that serves the `heart.html` file.
- **heart.html**: Contains the HTML and JavaScript for the heart animation.
- **application.properties**: Configuration file for application properties.
- **HeartAnimationApplicationTests.java**: Contains test cases for the application.

## License

This project is licensed under the MIT License.