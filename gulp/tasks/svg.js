import $ from "../config/plagins.js";

const svg = () => {
  return (
    app.src("src/svg/*.svg")
      .pipe($.replace("&gt;", ">"))
      .pipe(
        $.svgSprite({
          mode: {
            symbol: {
              sprite: "../sprite.svg",
              render: {
                scss: {
                  dest: "../_sprite.scss",
                  template:
                    "src/sass/global/helpers/sprite/_sprite_template.scss",
                },
              },
            },
          },
        })
      )
      .pipe(
        $.if(
          "*.scss",
          app.dest("./src/sass/global/helpers/sprite"),
          app.dest("./dist/img/sprite")
        )
      )
  );
}

export default svg;
