# Emscripten util to export .C to .JS
# exporting all functions from c file

emcc alphabeta.c -s WASM=1 -o alphabeta.html -s LINKABLE=1 -s EXPORT_ALL=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=["ccall"]