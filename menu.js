const categories = document.querySelector("[data-menu-tabs]");

if (categories) {
  const tabs = [...categories.querySelectorAll("a")];
  const panels = tabs.map((tab) => document.querySelector(tab.hash));

  function showCategory(index, moveFocus = false) {
    tabs.forEach((tab, position) => {
      const selected = index === position;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[position].hidden = !selected;
    });
    if (moveFocus) tabs[index].focus();
  }

  categories.setAttribute("role", "tablist");
  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panels[index].id);
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].tabIndex = 0;

    tab.addEventListener("click", (event) => {
      event.preventDefault();
      showCategory(index);
    });

    tab.addEventListener("keydown", (event) => {
      const targets = {
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!Object.hasOwn(targets, event.key)) return;
      event.preventDefault();
      showCategory(targets[event.key], true);
    });
  });

  const linkedCategory = tabs.findIndex((tab) => tab.hash === location.hash);
  showCategory(linkedCategory < 0 ? 0 : linkedCategory);
}