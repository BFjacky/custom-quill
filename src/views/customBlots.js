export default {
  registerCustomBlots: function(Quill) {
    const Block = Quill.import("blots/block");
    const BlockEmbed = Quill.import("blots/block/embed");

    // 一级子标题
    class Header1Blot extends Block {
      static formats() {
        return true;
      }
    }
    Header1Blot.blotName = "header1";
    Header1Blot.tagName = "h2";
    Quill.register(Header1Blot);

    // 二级子标题
    class Header2Blot extends Block {
      static formats() {
        return true;
      }
    }
    Header2Blot.blotName = "header2";
    Header2Blot.tagName = "h3";
    Quill.register(Header2Blot);

    // 自定义图片
    class ImageBlot extends BlockEmbed {
      static create(value) {
        let node = super.create();
        node.setAttribute("src", value);
        return node;
      }

      static value(node) {
        return node.getAttribute("src");
      }
    }
    ImageBlot.blotName = "myImage";
    ImageBlot.tagName = "img";
    Quill.register(ImageBlot);

    // 自定义卡片
    class CardBlot extends BlockEmbed {
      static create(value) {
        const node = super.create();
        node.dataset.title = value.title;
        node.dataset.image = value.image;
        node.dataset.content = value.content;
        node.dataset.author = value.author;

        const leftDiv = document.createElement("div");
        leftDiv.className = "media-container";
        const mediaDiv = document.createElement("div");
        mediaDiv.style["background-image"] = `url(${value.image})`;
        mediaDiv.className = "media";
        leftDiv.appendChild(mediaDiv);

        const rightDiv = document.createElement("div");
        rightDiv.className = "content-container";

        const titleP = document.createElement("p");
        titleP.className = "title";
        titleP.innerText = value.title;

        const authorP = document.createElement("p");
        authorP.className = "author";
        authorP.innerText = value.author;

        const contentP = document.createElement("p");
        contentP.className = "content";
        contentP.innerText = value.content;

        rightDiv.appendChild(titleP);
        rightDiv.appendChild(authorP);
        rightDiv.appendChild(contentP);
        node.appendChild(leftDiv);
        node.appendChild(rightDiv);

        node.setAttribute("contenteditable", false);

        return node;
      }
      static value(node) {
        return node.dataset;
      }
    }
    CardBlot.blotName = "card";
    CardBlot.tagName = "div";
    CardBlot.className = "card-DJRUAMCPQR14M9";
    Quill.register(CardBlot);

    // 宫格图片墙  1 ~ 9
    class ImageWallBlot extends BlockEmbed {
      static create(value) {
        const node = super.create();
        node.dataset.imageUrls = value.imageUrls; // 图片链接
        node.dataset.desc = value.desc; // 图片描述
        const imageUrls = JSON.parse(value.imageUrls);
        const imageLength = imageUrls.length;

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        for (let i = 0; i < imageLength; i++) {
          const imageWidthEle = document.createElement("div"); // 用来限制图片宽高，padding-bottom 相对于父元素进行作用
          imageWidthEle.className = "image-width";
          const imageEle = document.createElement("div");

          imageEle.style["background-image"] = `url(${imageUrls[i]})`;
          imageEle.style["padding-bottom"] = "100%";
          imageEle.style.width = "100%";
          imageEle.className = "image";

          if (imageLength >= 5 || imageLength === 3) {
            imageWidthEle.style.width = "33.33%";
          } else if (imageLength === 4 || imageLength === 2) {
            imageWidthEle.style.width = "50%";
          } else {
            imageWidthEle.style.width = "100%";
          }

          imageWidthEle.appendChild(imageEle);
          imageContainer.appendChild(imageWidthEle);
        }

        node.appendChild(imageContainer);

        node.setAttribute("contenteditable", false);
        return node;
      }
      static value(node) {
        return node.dataset;
      }
    }

    ImageWallBlot.blotName = "imageWall";
    ImageWallBlot.tagName = "div";
    ImageWallBlot.className = "image-wall-DJRWRN7834HFDEKPP";
    Quill.register(ImageWallBlot);
  }
};
