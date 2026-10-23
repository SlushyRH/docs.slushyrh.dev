import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export interface PageNode {
  path: string;
  label: string;
}

export function Pagination({ 
  projectId, 
  prevPage, 
  nextPage 
}: { 
  projectId: string;
  prevPage: PageNode | null;
  nextPage: PageNode | null;
}) {
  return (
    <div className="flex items-center justify-between pt-6 mt-12 border-t border-border">
      {prevPage ? (
        <Link to={`/${projectId}/${prevPage.path}`}>
          <Button variant="outline" size="lg">
            <LuArrowLeft className="mr-2" />
            {prevPage.label}
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link to={`/${projectId}/${nextPage.path}`}>
          <Button variant="outline" size="lg">
            {nextPage.label}
            <LuArrowRight className="ml-2" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}