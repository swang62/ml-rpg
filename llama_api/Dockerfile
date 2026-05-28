FROM ghcr.io/ggml-org/llama.cpp:server AS base

FROM scratch AS final
COPY --from=base / /

COPY models/bob-q4_k_m.gguf /app/model.gguf

EXPOSE 8080

ENTRYPOINT ["llama-server"]
CMD [
  "-m", "/app/model.gguf",
  "--host", "0.0.0.0",
  "--port", "8080",
  "--sleep-idle-seconds", "300",
  "--ctx-size", "4096",
  "--parallel", "1",
  "--threads", "4"
]
