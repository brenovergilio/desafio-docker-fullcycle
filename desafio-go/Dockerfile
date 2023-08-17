FROM golang:alpine as builder

WORKDIR /binary

COPY rocks.go .

RUN go build rocks.go


FROM scratch

COPY --from=builder /binary/rocks .

CMD [ "./rocks" ]
