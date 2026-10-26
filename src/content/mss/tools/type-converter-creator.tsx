import { Paragraph, Heading, Stepper, Step, Code, Grid, Image, CodeBlock } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

const rigidbodyConverterCodeExample = `// Auto-generated via the TypeConverterCreator
// Type: UnityEngine.Rigidbody

using System.Threading.Tasks;
using UnityEngine;

namespace SRH.ModularSaveSystem.Types.Components
{
    public class RigidbodyConverter : ITypeConverter<Rigidbody>
    {
        public async Task<Rigidbody> ConvertFromItem(Reader reader, Rigidbody defaultValue, ConverterArgs args)
        {
            Rigidbody rb = await Converter.PrepareInstance(reader, defaultValue, args);

            if (!rb)
                return null;

            bool defIsKinematic = default;
            bool defUseGravity = default;
            float defMass = default;
            float defLinearDamping = default;
            float defAngularDamping = default;
            RigidbodyConstraints defConstraints = default;
            Vector3 defLinearVelocity = default;
            Vector3 defAngularVelocity = default;

            await Dispatcher.RunOnMainThreadAsync(() =>
            {
                defIsKinematic = rb.isKinematic;
                defUseGravity = rb.useGravity;
                defMass = rb.mass;
                defLinearDamping = rb.linearDamping;
                defAngularDamping = rb.angularDamping;
                defConstraints = rb.constraints;
                defLinearVelocity = rb.linearVelocity;
                defAngularVelocity = rb.angularVelocity;
            });

            bool isKinematic = await reader.Read("isKinematic", defIsKinematic);
            bool useGravity = await reader.Read("useGravity", defUseGravity);
            float mass = await reader.Read("mass", defMass);
            float linearDamping = await reader.Read("linearDamping", defLinearDamping);
            float angularDamping = await reader.Read("angularDamping", defAngularDamping);
            RigidbodyConstraints constraints = await reader.Read("constraints", defConstraints);
            Vector3 linearVelocity = await reader.Read("linearVelocity", defLinearVelocity);
            Vector3 angularVelocity = await reader.Read("angularVelocity", defAngularVelocity);

            await Dispatcher.RunOnMainThreadAsync(() =>
            {
                rb.isKinematic = isKinematic;
                rb.useGravity = useGravity;
                rb.mass = mass;
                rb.linearDamping = linearDamping;
                rb.angularDamping = angularDamping;
                rb.constraints = constraints;
                rb.linearVelocity = linearVelocity;
                rb.angularVelocity = angularVelocity;
            });

            return rb;
        }

        public async Task<DataItem> ConvertToItem(Writer writer, Rigidbody rb, ConverterArgs args)
        {
            await writer.WriteRefID(rb);

            bool isKinematic = default;
            bool useGravity = default;
            float mass = default;
            float linearDamping = default;
            float angularDamping = default;
            RigidbodyConstraints constraints = default;
            Vector3 linearVelocity = default;
            Vector3 angularVelocity = default;

            await Dispatcher.RunOnMainThreadAsync(() =>
            {
                isKinematic = rb.isKinematic;
                useGravity = rb.useGravity;
                mass = rb.mass;
                linearDamping = rb.linearDamping;
                angularDamping = rb.angularDamping;
                constraints = rb.constraints;
                linearVelocity = rb.linearVelocity;
                angularVelocity = rb.angularVelocity;
            });

            await writer.Write("isKinematic", isKinematic);
            await writer.Write("useGravity", useGravity);
            await writer.Write("mass", mass);
            await writer.Write("linearDamping", linearDamping);
            await writer.Write("angularDamping", angularDamping);
            await writer.Write("constraints", constraints);
            await writer.Write("linearVelocity", linearVelocity);
            await writer.Write("angularVelocity", angularVelocity);

            return writer.Item;
        }
    }
}`;

function Content() {
  return (
    <>
      <Heading>Type Converter Creator</Heading>
      <Paragraph>do a step by step using stepper on how to use with images and shit</Paragraph>

      <Stepper noMargin>
        <Step>
          Navigate to <Code>Tools/SRH/MSS/Create Type Converter</Code> to open the Type Converter Creator window.
        </Step>
        <Step>
          <Paragraph>
            Enter the name of the type you want to create the converter for. You can either search for a type, or enter the direct namespace
            for a more accurate result; <Code>Rigidbody</Code> or <Code>UnityEngine.Rigidbody</Code>.
          </Paragraph>
          <Grid noMargin>
            <Image src="/resources/tools/tcc-empty.png" caption="Default empty window." />
            <Image src="/resources/tools/tcc-types.png" caption="All types that match search result." />
          </Grid>
        </Step>
        <Step>
          <Paragraph>
            Now just select all of the members you want to be serialized! You can optionally enter the namespace you want the file to be under. Once you're done
            selecting the members you want to be serialized, just click the <Code>Create Type Converter</Code> button at the bottom and the file will be generated!
          </Paragraph>
          <Grid noMargin>
            <Image src="/resources/tools/tcc-select-data-to-save.png" caption="Window with all available members to be serialized." />
            <Image src="/resources/tools/tcc-create-type-converter.png" caption="All types that match search result." />
          </Grid>
        </Step>
        <Step>
          <Paragraph>
            The file will be generated under the type name with converter at the end; <Code>Rigidbody</Code> = <Code>RigidbodyConverter</Code>. You can open the file
            and edit it anytime, replace the names the members are serialized as or add/remove any members you want.
          </Paragraph>

          <CodeBlock language="csharp" code={rigidbodyConverterCodeExample} filename="RigidbodyConverter.cs" noMargin />
        </Step>
      </Stepper>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Type Converter Creator',
  section: 'modules',
  order: 0,
  Content: Content,
}