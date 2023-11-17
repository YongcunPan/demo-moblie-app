FROM nginx:1.16.1-alpine
LABEL key="Founder"
EXPOSE 10108
ENV TimeZone='Asia/Shanghai'
RUN mkdir -p /data/ui/ && \
    sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/${TimeZone} /etc/localtime && \
    echo ${TimeZone} > /etc/timezone && \
    apk del tzdata
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /data/ui/