# CNM - Products Project

## 1. Clone repository

```bash
git clone <repository-link>
```

## 2. Move to project folder

```bash
cd Products
```

## 3. Install dependencies

```bash
npm install
```

This command will install all required packages listed in `package.json`.

## 4. Create environment file

Create a `.env` file in the project root.

Example:

```
PORT=3000
ACCESS_KEY_ID=your_access_key
SECRET_ACCESS_KEY=your_secret_key
REGION=your_region
DYNAMODB_TABLE=your_table_name
BUCKET_NAME=your_bucket
```

## 5. Run the project

```bash
npm run start
```

## 6. Open in browser

```
http://localhost:3000/products
```
