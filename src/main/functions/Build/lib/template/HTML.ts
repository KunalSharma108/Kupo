interface HTMLProps {
  project: string;
  HtmlBlock: any;
  CssBlock: any;
}

export async function fullHTML({ project, HtmlBlock, CssBlock }: HTMLProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${project}</title>

      <style>
        /* Injected dynamic CSS */
        ${CssBlock}
      </style>
    </head>
    <body>
      ${HtmlBlock}
    </body>
    </html>
  `
}