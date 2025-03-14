import { PATH, JAVA } from "../mod.ts";

export async function executeCommandJavaJing(
  schemaFile: string, // Schemat RELAX NG (rng lub rnc)
  xmlFile: string, // Dokument XML do walidacji
): Promise<void> {
  const command = new Deno.Command("java", {
    args: [
      "-jar",
      (await PATH(JAVA.jingJAR, true)).pathAbsolute,
      (await PATH(schemaFile, true)).pathAbsolute, // Schemat RELAX NG
      (await PATH(xmlFile, true)).pathAbsolute, // Plik XML do walidacji
    ],
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
  });

  const output = await command.output();
  if (output.code === 0) {
    console.log(`Plik ${xmlFile} jest zgodny ze schematem ${schemaFile}`);
  } else {
    console.error(
      `Plik ${xmlFile} NIE jest zgodny ze schematem ${schemaFile}:`,
      new TextDecoder().decode(output.stderr),
    );
  }
}
