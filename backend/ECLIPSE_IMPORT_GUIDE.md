# Eclipse Import Guide

## ✅ Project is Ready for Eclipse

The project is now configured as a **Maven project** with Eclipse support files.

## How to Import into Eclipse

### Method 1: Import Existing Maven Project (Recommended)

1. **Open Eclipse**
2. **File** → **Import**
3. Select **Maven** → **Existing Maven Projects**
4. Click **Next**
5. **Browse** to: `C:\Users\Test\employee-managment-system\backend`
6. Make sure `pom.xml` is checked
7. Click **Finish**

### Method 2: Import as General Project

1. **File** → **Import**
2. Select **General** → **Existing Projects into Workspace**
3. Click **Next**
4. **Browse** to: `C:\Users\Test\employee-managment-system\backend`
5. Make sure the project is checked
6. Click **Finish**

## After Import

### 1. Update Maven Project
- Right-click on project → **Maven** → **Update Project**
- Check "Force Update of Snapshots/Releases"
- Click **OK**

### 2. Verify Java Version
- Right-click project → **Properties**
- **Java Build Path** → **Libraries**
- Ensure Java 17 is configured

### 3. Install Maven Dependencies
- Right-click on `pom.xml` → **Run As** → **Maven install**
- Wait for dependencies to download

## Project Structure

```
backend/
├── .project          ✅ Eclipse project file
├── .classpath        ✅ Eclipse classpath file
├── .settings/        ✅ Eclipse settings
├── pom.xml           ✅ Maven configuration
└── src/
    ├── main/
    │   ├── java/     ✅ Source code
    │   └── resources/ ✅ Configuration files
    └── test/
        └── java/     ✅ Test code
```

## Requirements

- **Eclipse IDE for Enterprise Java and Web Developers** (recommended)
- **Java 17** JDK installed
- **M2E (Maven Integration for Eclipse)** plugin (usually pre-installed)

## Troubleshooting

### If project doesn't show as Maven project:
1. Right-click project → **Configure** → **Convert to Maven Project**

### If dependencies are not resolved:
1. Right-click `pom.xml` → **Maven** → **Reload Project**
2. Or: Right-click project → **Maven** → **Update Project**

### If Java version is wrong:
1. Right-click project → **Properties**
2. **Java Build Path** → **Libraries**
3. Remove old JRE, add Java 17

### If build errors occur:
1. **Project** → **Clean** → Select project → **Clean**
2. **Project** → **Build Project**

## Running the Application

### From Eclipse:
1. Right-click `EmployeeManagementApplication.java`
2. **Run As** → **Java Application**

### From Command Line:
```bash
cd C:\Users\Test\employee-managment-system\backend
mvn spring-boot:run
```

## Verification

After import, you should see:
- ✅ No compilation errors
- ✅ All dependencies resolved
- ✅ Project shows Maven icon
- ✅ `src/main/java` is marked as source folder
- ✅ `src/main/resources` is marked as resource folder
