# Agentic AI – Remote MCP Server on GCP

## Steps

### 1. Authenticate and set project
```bash
gcloud auth login
gcloud config set project neat-veld-467519-e1
```
### 2. Enable required services
```bash
gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com
```
### 3. Create Artifact Registry repository
```bash
gcloud artifacts repositories create remote-mcp \
    --repository-format=docker \
    --location=us-central1
```
### 4. Build and push Docker image
```bash
gcloud builds submit \
    --tag us-central1-docker.pkg.dev/neat-veld-467519-e1/remote-mcp/mcp-server:latest
```
### 5. Deploy to Cloud Run
```bash
gcloud run deploy mcp-server \
    --image us-central1-docker.pkg.dev/neat-veld-467519-e1/remote-mcp/mcp-server:latest \
    --region=us-central1
```
### 6. Testing
#### Option 1 – via Cloud Run proxy
```bash
gcloud run services proxy mcp-server --region=us-central1
```
#### Option 2 – Publicly (if unauthenticated access allowed)
```bash
SERVICE_URL=$(gcloud run services describe mcp-server \
  --region=us-central1 --format="value(status.url)")
curl "$SERVICE_URL/mcp"  # Or connect via MCP client
```
#### MCP Client Test (Optional)
```bash
python test.py
```