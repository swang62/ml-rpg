import type { Component } from "solid-js";

const LessonMetadataManagementWhatIsMetadataManagementInDataSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Metadata Management in Data Systems?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Metadata Management</strong> is the systematic
                organization of "data about data" so teams can discover,
                understand, and govern data assets at scale. A{" "}
                <strong>Data Catalog</strong> is the system that makes this
                metadata searchable and actionable.
              </div>
            </div>
            The core problem is trust and usability. In a small system with five
            tables, engineers keep mental models of what each column means, who
            owns it, and how fresh the data is. But at scale with 100,000+
            tables, multi-petabyte data lakes, and thousands of pipelines, this
            mental model breaks down completely. You get duplicated datasets,
            broken dashboards that use stale data, compliance risks from
            undocumented personally identifiable information (PII), and
            debugging that takes days instead of minutes.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Metadata comes in three categories:
            </div>
            First, <strong>technical metadata</strong> describes the physical
            properties: schemas, data types, partitioning strategies, file
            formats like Parquet or Avro, storage locations in object stores,
            record counts, freshness timestamps, and statistics such as distinct
            value counts. Second, <strong>business metadata</strong> captures
            the semantic meaning: human readable descriptions of what the data
            represents, which business domain it belongs to, who owns it,
            service level agreements (SLAs) for freshness, data quality
            expectations, and classification tags like PII, PCI (Payment Card
            Industry), or HIPAA (Health Insurance Portability and
            Accountability). Third, <strong>operational metadata</strong> tracks
            how data is used: lineage showing which datasets depend on others,
            job execution history with failures and latency, compute costs,
            query logs showing who accesses what, and usage patterns.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why Catalogs Matter:
            </div>
            Without a catalog, every team builds their own understanding of data
            through tribal knowledge, scattered documentation, and reverse
            engineering. With a catalog, you get a single search surface where
            analysts can find "all datasets containing customer email addresses"
            in seconds, governance teams can enforce policies like "any PII must
            be masked for non-privileged users," and engineers can trace the
            impact of a schema change across hundreds of downstream dashboards.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Modern lakehouses like Databricks
              Unity Catalog or AWS Glue Data Catalog sit at the center of the
              data platform, unifying metadata from warehouses, lakes, streaming
              systems, and business intelligence (BI) tools. They provide APIs
              for discovery, lineage exploration, and policy enforcement.
            </div>
            The conceptual shift is treating metadata as a first class,
            versioned, queryable dataset with strict SLAs, not as a side effect
            or afterthought.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Technical Metadata</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    schemas, types, stats
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Business Metadata</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    owners, SLAs, PII tags
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Operational Metadata</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    lineage, usage, costs
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; margin-top: 8px">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 14px 20px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 15px">Data Catalog</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    unified search &amp; governance
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata is data about data: technical properties (schemas,
                  types), business context (owners, SLAs, PII classification),
                  and operational history (lineage, usage, costs)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data catalogs solve the trust and discoverability problem at
                  scale: finding relevant datasets among 100,000+ tables takes
                  seconds instead of days of tribal knowledge hunting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Without systematic metadata management, teams duplicate work,
                  dashboards break silently on stale data, and compliance risks
                  emerge from undocumented sensitive data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern catalogs like Databricks Unity Catalog and AWS Glue act
                  as the control plane for access policies, enforcing rules like
                  "mask PII for non-privileged users" automatically
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A financial company with 50,000 tables uses a catalog to tag
                  all datasets containing credit card data with PCI
                  classification, automatically triggering encryption and audit
                  logging requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An analyst searches the catalog for "customer churn" and finds
                  three relevant datasets with owners, freshness SLAs (updated
                  hourly), and lineage showing which machine learning (ML)
                  models depend on them
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When a schema change adds a new column to a core events table,
                  the catalog's lineage graph identifies 127 downstream
                  dashboards and pipelines that might be affected, preventing
                  silent breakage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMetadataManagementWhatIsMetadataManagementInDataSystems;
