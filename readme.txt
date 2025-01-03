Build Docker image with
sudo docker build . -t rawai


Start Docker container with
sudo docker run -v ~/.rawai:/var/rawai -p 5000:5000 -i -t rawai:latest

