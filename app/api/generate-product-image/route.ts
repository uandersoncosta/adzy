import { ai } from "@/lib/gemini";
import { imagekit } from "@/lib/imagekit";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `Crie uma imagem vibrante de vitrine de produto, destacando a imagem enviada no centro, cercada por respingos dinâmicos de líquido ou materiais relevantes.
Use um fundo limpo e colorido para destacar o produto. Inclua ingredientes ou elementos relacionados flutuando ao redor para adicionar contexto e interesse visual.
Garanta que o produto esteja nítido e em foco, transmitindo movimento e energia.
Além disso, forneça um prompt de imagem para vídeo no mesmo estilo em formato JSON, Responda apenas em formato JSON válido no seguinte formato{textToImage: "", textToVideo: ""}.Não inclua explicações, somente JSON.`;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const description = formData.get("description");
  const size = formData?.get("size");

  // upload product image
  const arrayBuffer = await file.arrayBuffer();
  const base64File = Buffer.from(arrayBuffer).toString("base64");
  const imageKitRef = await imagekit.upload({
    file: base64File,
    fileName: Date.now() + ".png",
    isPublished: true,
  });

  console.log(imageKitRef.url);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { text: PROMPT },
        {
          inlineData: {
            mimeType: file.type,
            data: base64File,
          },
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const textOutPut = response.text ?? "";
    console.log("Response from Gemini:", textOutPut);
    let json = JSON.parse(textOutPut);

    const PROMPTFINAL = [
      //@ts-ignore
      { text: json?.textToImage },
      {
        inlineData: {
          mimeType: file.type,
          data: base64File,
        },
      },
    ];

    const imageResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: PROMPTFINAL,
    });

    //@ts-ignore

    const generatedImage = imageResponse.candidates?.[0]?.content?.parts;
    const imageData = generatedImage?.[0]?.inlineData?.data;
    //@ts-ignore
    const buffer = Buffer.from(imageData, "base64");

    //Upload generate Image to Imagekit
    const uploadResult = await imagekit.upload({
      file: `data:image/png;base,${buffer}`,
      fileName: `generate-${Date.now()}.png`,
      isPublished: true,
    });

    return NextResponse.json(uploadResult?.url);
  } catch (error) {
    console.error("Erro detalhado:", error);
    console.error("Erro detalhado:", error); // Logar o erro completo ajuda a depurar
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
