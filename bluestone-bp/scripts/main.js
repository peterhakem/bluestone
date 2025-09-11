import { system, world, ItemComponentTypes } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

/**
 * @param {import("@minecraft/server").Player} source
 */
function introUi(source) {
  const form = new ActionFormData()
    .title({ translate: "bs:ui.title" })
    .body({ translate: "bs:ui.body" })
    .button({ translate: "bs:ui.exit" });

  form.show(source).then((result) => {
    if (result.canceled || result.selection === undefined) return;

    console.log(result.selection);
  });
}

system.beforeEvents.startup.subscribe(init => {
  init.itemComponentRegistry.registerCustomComponent("bs:intro", {
    onUse: ({ itemStack, source }) => {
      const cooldown = itemStack.getComponent(ItemComponentTypes.Cooldown);
      cooldown.startCooldown(source);
      introUi(source)
    }
  })
})
