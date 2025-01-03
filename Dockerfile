
FROM python:3.12
RUN apt update && apt install -y less
RUN mkdir /var/rawai
RUN mkdir /usr/share/rawai
COPY /backend/*.py /usr/share/rawai/
COPY /backend/requirements.txt /usr/share/rawai/
RUN mkdir /usr/share/rawai/static
COPY /frontend/rawai-report/dist/rawai-report/* /usr/share/rawai/static/
COPY /frontend/rawai-report/public* /usr/share/rawai/static/

RUN pip3 install -r /usr/share/rawai/requirements.txt

EXPOSE 5000

CMD ["python","/usr/share/rawai/rawai-report.py", "/var/rawai"]
