const copy = () => {
  return app.src(["src/files/**/*", "!src/files/fontraw/**"]) // exclude raw font file
    .pipe(app.dest("dist/"));
}

export default copy;
