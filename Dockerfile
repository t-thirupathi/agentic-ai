FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Ensure logs appear immediately
ENV PYTHONUNBUFFERED=1

# Default Cloud Run entrypoint
CMD ["python", "server.py"]
