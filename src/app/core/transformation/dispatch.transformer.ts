import * as ts from 'typescript';

function visit(ctx: ts.TransformationContext, source: ts.SourceFile) {
  const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<any> => {
    console.log(source.fileName);
    return ts.visitEachChild(node, visitor, ctx);
  };
  return visitor;
}

export default function () {
  return (ctx: ts.TransformationContext): ts.Transformer<any> => {
    return (source: ts.SourceFile) => ts.visitNode(source, visit(ctx, source));
  };
}
