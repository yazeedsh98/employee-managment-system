# Build Instructions for Employee Management System

## ✅ Build Status: SUCCESS

The project has been successfully built and tested.

## Problem Fixed

The original issue was that Maven was configured to use a custom repository mirror (`dbnk-maven-public`) that was not accessible. This has been fixed by:

1. **Added Maven Central repositories** to `pom.xml`
2. **Created temporary settings file** (`settings-temp.xml`) that uses Maven Central

## How to Build

### Option 1: Using Temporary Settings File (Recommended)

```bash
cd C:\Users\Test\employee-managment-system\backend
mvn clean install -s settings-temp.xml
```

### Option 2: Using Maven Central (if repositories in pom.xml work)

```bash
cd C:\Users\Test\employee-managment-system\backend
mvn clean install
```

## How to Run

### Using Maven:

```bash
cd C:\Users\Test\employee-managment-system\backend
mvn spring-boot:run -s settings-temp.xml
```

### Using Java directly:

```bash
cd C:\Users\Test\employee-managment-system\backend
java -jar target/employee-management-system-1.0.0.jar
```

## Importing into STS/Eclipse

### Method 1: Import as Maven Project

1. **File** → **Import**
2. **Maven** → **Existing Maven Projects**
3. Browse to: `C:\Users\Test\employee-managment-system\backend`
4. Select `pom.xml`
5. Click **Finish**

### After Import - Configure Maven Settings

Since your global Maven settings use an inaccessible repository, you need to configure STS/Eclipse to use Maven Central:

1. **Window** → **Preferences**
2. **Maven** → **User Settings**
3. Click **Browse** and select: `C:\Users\Test\employee-managment-system\backend\settings-temp.xml`
4. Click **Apply and Close**
5. Right-click project → **Maven** → **Update Project**
6. Check "Force Update of Snapshots/Releases"
7. Click **OK**

### Alternative: Use Project Settings

The `pom.xml` now includes Maven Central repositories, so it should work even with your global settings. If it doesn't, use the temporary settings file method above.

## Build Output

After successful build, you should see:
- `target/` directory created
- `target/employee-management-system-1.0.0.jar` - executable JAR file
- `target/classes/` - compiled classes
- `target/test-classes/` - compiled test classes

## Verification

To verify the build worked:

```bash
# Check if JAR file exists
dir target\*.jar

# Check build status
mvn verify -s settings-temp.xml
```

## Application URLs

Once running, the application will be available at:
- **Main Application**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs
- **H2 Console**: http://localhost:8080/h2-console

## Troubleshooting

### If build still fails:

1. **Clear Maven cache**:
   ```bash
   mvn dependency:purge-local-repository -s settings-temp.xml
   ```

2. **Update Maven project in Eclipse**:
   - Right-click project → **Maven** → **Update Project**

3. **Check Java version**:
   ```bash
   java -version
   ```
   Should be Java 17 or higher

4. **Use offline mode** (if dependencies are already downloaded):
   ```bash
   mvn clean install -o -s settings-temp.xml
   ```

## Notes

- The `settings-temp.xml` file uses Maven Central directly
- The `pom.xml` includes repositories section for Maven Central
- Both methods should work, but using `-s settings-temp.xml` is more reliable
