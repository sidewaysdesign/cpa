const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;

registerBlockType("swd/template-part-swap-language", {
  title: "Template Part Swap Language",
  category: "layout",
  edit: function (props) {
    var slug = props.attributes.slug;
    var messageStart = "This block displays the ";
    var messageEnd =
      " template part for the current language. The block is added manually to the HTML templates and may require clearing local customizations.";
    var strongSlug = createElement("strong", {}, slug);
    var style = {
      textAlign: "center",
      padding: "0.5em",
      border: "1px solid #ccc",
      color: "#990000", // Change the color to red
      fontSize: "15px", // Change the font size to 20px
    };
    return createElement("p", { style: style }, [messageStart, strongSlug, messageEnd]);
  },
  save: function () {
    return null; // The save function needs to be present, but we render it with PHP
  },
});
