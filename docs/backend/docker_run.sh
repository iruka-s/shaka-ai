# Ubuntu
sudo docker run --gpus 1  --privileged --device /dev/snd --group-add audio --net host -e DISPLAY=$DISPLAY -v /tmp/.X11-unix/:/tmp.X11-unix -it -v $(pwd):/home shaka-backend

# Windows
docker run -it -v C:\Users\iruka\py_workspace\shaka-ai\backend:/home/ -p 127.0.0.1:8000:8000 shaka-backend