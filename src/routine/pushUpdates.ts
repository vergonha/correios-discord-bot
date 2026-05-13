import logger from "../logger.js";

export default async function pushUpdates(title: string, message: string) {
  const slug = process.env.NTFY_SLUG;

  if (!slug) {
    logger.warn("NTFY_SLUG não definido.");
    return;
  }

  try {
    const response = await fetch(`https://ntfy.sh/${slug}`, {
      method: "POST",
      headers: {
        Title: title,
        Priority: "default",
        Tags: "package,mailbox_with_mail",
      },
      body: message,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar push: ${response.status}`);
    }

    logger.info("Push enviado com sucesso.");
  } catch (error) {
    logger.error("Erro ao enviar notificação push:", error);
  }
}
