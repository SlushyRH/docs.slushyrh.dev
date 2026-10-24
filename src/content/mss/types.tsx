import { Paragraph, Heading, Expandable, Grid, Empty, Link } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta, ProjectMeta } from "@/lib/types";

function Content({ project }: { project: ProjectMeta }) {
  return (
    <>
      <Heading>Supported Types</Heading>
      <Paragraph>
        Modular Save System (MSS) provides robust out-of-the-box support for a wide variety of native C# types, collections, and Unity-specific components and structs. 
      </Paragraph>

      <Paragraph>
        Beyond the built-in types, the system automatically supports serialization and deserialization for your own custom types (learn how to customize or write your own on the <Link to={`/${project.id}/custom-type-serialization`}>Custom Type Serialization</Link> page):
      </Paragraph>
      
      <List type="unordered" className="mb-6">
        <span><strong>Classes:</strong> Any custom class is supported (requires a parameterless constructor).</span>
        <span><strong>Structs:</strong> Any custom struct is natively supported.</span>
        <span><strong>MonoBehaviours:</strong> Your custom Unity components and scripts.</span>
        <span><strong>ScriptableObjects:</strong> Your custom data containers and configuration objects.</span>
      </List>

      <Paragraph>
        Expand the categories below to see the full list of natively supported built-in types.
      </Paragraph>
      
      <Grid maxColumns={2} className="mb-8">
        <Empty noMargin>
          <Expandable title="Primitives" noMargin>
            <List type="unordered">
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.boolean">Bool</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.byte">Byte</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.char">Char</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.datetime">DateTime</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.decimal">Decimal</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.double">Double</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.enum">Enums</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.single">Float</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.guid">Guid</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.int32">Int</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.int64">Long</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.intptr">NInt</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.uintptr">NUint</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.object">Object</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.sbyte">Sbyte</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.int16">Short</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.string">String</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.timespan">TimeSpan</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.type">Type</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.uint32">UInt</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.uint64">ULong</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.uint16">UShort</Link>
            </List>
          </Expandable>
        </Empty>
        <Empty noMargin>
          <Expandable title="Collections" noMargin>
            <List type="unordered">
              <span><Link to="https://learn.microsoft.com/en-us/dotnet/api/system.array">Array</Link> (Multidimensional Array's also supported.)</span>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.arraylist">ArrayList</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.bitarray">BitArray</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.concurrent.concurrentbag-1">ConcurrentBag&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.concurrent.concurrentdictionary-2">ConcurrentDictionary&lt;TKey, TValue&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.concurrent.concurrentqueue-1">ConcurrentQueue&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.concurrent.concurrentstack-1">ConcurrentStack&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2">Dictionary&lt;TKey, TValue&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1">HashSet&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.hashtable">Hashtable</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1">LinkedList&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1">List&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.queue">Queue</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1">Queue&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.sorteddictionary-2">SortedDictionary&lt;TKey, TValue&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.sortedlist-2">SortedList&lt;TKey, TValue&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.sortedset-1">SortedSet&lt;T&gt;</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.stack">Stack</Link>
              <Link to="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.stack-1">Stack&lt;T&gt;</Link>
            </List>
          </Expandable>
        </Empty>
        <Empty>
          <Expandable title="Unity Components">
            <List type="unordered">
              <Link to="https://docs.unity3d.com/ScriptReference/Animator.html">Animator</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/BoxCollider.html">BoxCollider</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/BoxCollider2D.html">BoxCollider2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/CapsuleCollider.html">CapsuleCollider</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/CapsuleCollider2D.html">CapsuleCollider2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/CircleCollider2D.html">CircleCollider2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/CustomCollider2D.html">CustomCollider2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/EdgeCollider2D.html">EdgeCollider2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/GameObject.html">GameObject</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/MeshCollider.html">MeshCollider</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/PolygonCollider2D.html">PolygonCollider2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/RectTransform.html">RectTransform</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Rigidbody.html">Rigidbody</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Rigidbody2D.html">Rigidbody2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/SphereCollider.html">SphereCollider</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/SpriteRenderer.html">SpriteRenderer</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Transform.html">Transform</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/WheelCollider.html">WheelCollider</Link>
            </List>
          </Expandable>
        </Empty>
        <Empty>
          <Expandable title="Unity Types">
            <List type="unordered">
              <Link to="https://docs.unity3d.com/ScriptReference/AnimationCurve.html">AnimationCurve</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/AudioClip.html">AudioClip</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/BoundingSphere.html">BoundingSphere</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Bounds.html">Bounds</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/BoundsInt.html">BoundsInt</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Color.html">Color</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Color32.html">Color32</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/FrustumPlanes.html">FrustumPlanes</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Gradient.html">Gradient</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/GradientAlphaKey.html">GradientAlphaKey</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/GradientColorKey.html">GradientColourKey</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Keyframe.html">Keyframe</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/LayerMask.html">LayerMask</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Material.html">Material</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Matrix4x4.html">Matrix</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Mesh.html">Mesh</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Plane.html">Plane</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Quaternion.html">Quaternion</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Ray.html">Ray</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Ray2D.html">Ray2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Rect.html">Rect</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/RectInt.html">RectInt</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/RefreshRate.html">RefreshRate</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/RenderTexture.html">RenderTexture</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Resolution.html">Resolution</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Shader.html">Shader</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/SoftJointLimit.html">SoftJointLimit</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Sprite.html">Sprite</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Texture2D.html">Texture2D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Texture3D.html">Texture3D</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Vector2.html">Vector2</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Vector2Int.html">Vector2Int</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Vector3.html">Vector3</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Vector3Int.html">Vector3Int</Link>
              <Link to="https://docs.unity3d.com/ScriptReference/Vector4.html">Vector4</Link>
            </List>
          </Expandable>
        </Empty>
      </Grid>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Supported Types',
  section: 'overview',
  order: 0,
  Content: Content,
}