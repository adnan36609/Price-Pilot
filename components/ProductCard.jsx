"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChartLine,
  ImageOff,
} from "lucide-react";
import Link from "next/link";
import { resolveProductImageUrl } from "@/lib/utils";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = resolveProductImageUrl(product.image_url, product.url);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product.id);
      setShowRemoveConfirmation(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          {imageSrc &&
            (!imageFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ) : (
              <div className="w-20 h-20 rounded-md border bg-gray-50 flex items-center justify-center shrink-0">
                <ImageOff className="w-6 h-6 text-gray-400" />
              </div>
            ))}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-500">
                {product.currency} {product.current_price}
              </span>
              <Badge variant="secondary" className="gap-1">
                <TrendingDown className="w-3 h-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(true)}
            className="gap-1"
          >
            <ChartLine className="w-4 h-4" />
            Show Chart
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            nativeButton={false}
            render={
              <Link href={product.url} target="_blank" rel="noopener noreferrer" />
            }
          >
            <ExternalLink className="w-4 h-4" />
            View Product
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRemoveConfirmation(true)}
            disabled={deleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </CardContent>

      <Dialog open={showChart} onOpenChange={setShowChart}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Price History</DialogTitle>
            <DialogDescription className="pr-10 line-clamp-2 break-words">
              {product.name}
            </DialogDescription>
          </DialogHeader>
          <PriceChart productId={product.id} showTitle={false} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={showRemoveConfirmation}
        onOpenChange={(open) => !deleting && setShowRemoveConfirmation(open)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove product?</DialogTitle>
            <DialogDescription>
              This will stop tracking {product.name}. You can add it again later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowRemoveConfirmation(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Removing..." : "Remove product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
  
}

