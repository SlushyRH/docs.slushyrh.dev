import { Paragraph, Heading, Expandable, Grid, Empty, Link } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Supported Types</Heading>
      <Paragraph>talk about the types that are support, expandables with each native type support</Paragraph>
      <Grid maxColumns={2}>
        <Empty>
          <Expandable title="Primitives">
            <List type="unordered">
              <Link to="undefined">Bool</Link>
              <Link to="undefined">Byte</Link>
              <Link to="undefined">Char</Link>
              <Link to="undefined">DateTime</Link>
              <Link to="undefined">Decimal</Link>
              <Link to="undefined">Double</Link>
              <Link to="undefined">Enums</Link>
              <Link to="undefined">Float</Link>
              <Link to="undefined">Guid</Link>
              <Link to="undefined">Int</Link>
              <Link to="undefined">Long</Link>
              <Link to="undefined">NInt</Link>
              <Link to="undefined">NUint</Link>
              <Link to="undefined">Object</Link>
              <Link to="undefined">Sbyte</Link>
              <Link to="undefined">Short</Link>
              <Link to="undefined">String</Link>
              <Link to="undefined">TimeSpan</Link>
              <Link to="undefined">Type</Link>
              <Link to="undefined">UInt</Link>
              <Link to="undefined">ULong</Link>
              <Link to="undefined">UShort</Link>
            </List>
          </Expandable>
        </Empty>
        <Empty>
          <Expandable title="Collections">
            <List type="unordered">
              <span><Link to="undefined">Array</Link> (Multidimensional Array's also supported.)</span>
              <Link to="undefined">ArrayList</Link>
              <Link to="undefined">BitArray</Link>
              <Link to="undefined">ConcurrentBag&lt;T&gt;</Link>
              <Link to="undefined">ConcurrentDictionary&lt;TKey, TValue&gt;</Link>
              <Link to="undefined">ConcurrentQueue&lt;T&gt;</Link>
              <Link to="undefined">ConcurrentStack&lt;T&gt;</Link>
              <Link to="undefined">Dictionary&lt;TKey, TValue&gt;</Link>
              <Link to="undefined">HashSet&lt;T&gt;</Link>
              <Link to="undefined">Hashtable</Link>
              <Link to="undefined">LinkedList&lt;T&gt;</Link>
              <Link to="undefined">List&lt;T&gt;</Link>
              <Link to="undefined">Queue</Link>
              <Link to="undefined">Queue&lt;T&gt;</Link>
              <Link to="undefined">SortedDictionary&lt;TKey, TValue&gt;</Link>
              <Link to="undefined">SortedList&lt;TKey, TValue&gt;</Link>
              <Link to="undefined">SortedSet&lt;T&gt;</Link>
              <Link to="undefined">Stack</Link>
              <Link to="undefined">Stack&lt;T&gt;</Link>
            </List>
          </Expandable>
        </Empty>
        <Empty>
          <Expandable title="Unity Components">
            <List type="unordered">
              <Link to="https://docs.unity3d.com/ScriptReference/Animator.html">Animator</Link>
              <Link to="undefined">BoxCollider</Link>
              <Link to="undefined">BoxCollider2D</Link>
              <Link to="undefined">CapsuleCollider</Link>
              <Link to="undefined">CapsuleCollider2D</Link>
              <Link to="undefined">CircleCollider2D</Link>
              <Link to="undefined">CustomCollider2D</Link>
              <Link to="undefined">EdgeCollider2D</Link>
              <Link to="undefined">GameObject</Link>
              <Link to="undefined">MeshCollider</Link>
              <Link to="undefined">PolygonCollider2D</Link>
              <Link to="undefined">RectTransform</Link>
              <Link to="undefined">Rigidbody</Link>
              <Link to="undefined">Rigidbody2D</Link>
              <Link to="undefined">SphereCollider</Link>
              <Link to="undefined">SpriteRenderer</Link>
              <Link to="undefined">Transform</Link>
              <Link to="undefined">WheelCollider</Link>
            </List>
          </Expandable>
        </Empty>
        <Empty>
          <Expandable title="Unity Types">
            <List type="unordered">
              <Link to="undefined">AnimationCurve</Link>
              <Link to="undefined">AudioClip</Link>
              <Link to="undefined">BoundingSphere</Link>
              <Link to="undefined">Bounds</Link>
              <Link to="undefined">BoundsInt</Link>
              <Link to="undefined">Color</Link>
              <Link to="undefined">Color32</Link>
              <Link to="undefined">FrustumPlanes</Link>
              <Link to="undefined">Gradient</Link>
              <Link to="undefined">GradientAlphaKey</Link>
              <Link to="undefined">GradientColourKey</Link>
              <Link to="undefined">Keyframe</Link>
              <Link to="undefined">LayerMask</Link>
              <Link to="undefined">Material</Link>
              <Link to="undefined">Matrix</Link>
              <Link to="undefined">Mesh</Link>
              <Link to="undefined">Plane</Link>
              <Link to="undefined">Quaternion</Link>
              <Link to="undefined">Ray</Link>
              <Link to="undefined">Ray2D</Link>
              <Link to="undefined">Rect</Link>
              <Link to="undefined">RectInt</Link>
              <Link to="undefined">RefreshRate</Link>
              <Link to="undefined">RenderTexture</Link>
              <Link to="undefined">Resolution</Link>
              <Link to="undefined">Shader</Link>
              <Link to="undefined">SoftJointLimit</Link>
              <Link to="undefined">Sprite</Link>
              <Link to="undefined">Texture2D</Link>
              <Link to="undefined">Texture3D</Link>
              <Link to="undefined">Vector2</Link>
              <Link to="undefined">Vector2Int</Link>
              <Link to="undefined">Vector3</Link>
              <Link to="undefined">Vector3Int</Link>
              <Link to="undefined">Vector4</Link>
            </List>
          </Expandable>
        </Empty>
      </Grid>

      <Heading>Custom Type Converters</Heading>
      <Paragraph>talk about to add custom type support</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Supported Types',
  section: 'overview',
  order: 0,
  Content: Content,
}