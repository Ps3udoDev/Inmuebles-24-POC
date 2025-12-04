import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  imageUrl,
}: TestimonialCardProps) {
  return (
    <div className="relative">
      <Card className="shadow-lg border-none">
        <CardContent className="p-8">
          <Image
            alt={`Foto de ${author}`}
            className="w-24 h-24 rounded-full mx-auto -mt-20 mb-4 border-4 border-white dark:border-card object-cover"
            src={imageUrl}
            width={96}
            height={96}
          />
          <p className="text-muted-foreground italic mb-4">&ldquo;{quote}&rdquo;</p>
          <p className="mt-4 font-bold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </CardContent>
      </Card>
    </div>
  );
}
