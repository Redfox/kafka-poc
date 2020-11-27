# POC with Kafka and Elasticsearch

- setup Docker

``` 

# kafka

cd docker-kafka

docker-compose up -d


# Elasticsearch

cd docker-elasticsearch

docker-compose up -d

```

- setup API and notification ms

```

# api

cd api

yarn install

yarn dev


# notification ms

cd notification

yarn

yarn dev

```

