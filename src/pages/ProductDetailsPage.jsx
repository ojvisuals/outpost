import { useParams } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import FactList from '../components/ui/FactList.jsx';
import ProductImage from '../components/ui/ProductImage.jsx';
import StateMessage from '../components/ui/StateMessage.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Disclaimer from '../components/ui/Disclaimer.jsx';
import { useHistory } from '../hooks/useHistory.js';
import { formatDate, formatDateTime, identifierLabel } from '../utils/format.js';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { records } = useHistory();
  const record = records.find((r) => r.id === id);

  if (!record || !record.product) {
    return (
      <StateMessage
        tone="info"
        icon="package"
        title="No product details to show"
        actions={<Button to={record ? `/result/${record.id}` : '/'}>Back to result</Button>}
      >
        Full details are only available when a product has been identified.
      </StateMessage>
    );
  }

  const { product, nafdac, identifier } = record;

  return (
    <div className="details">
      <PageHeader title="Product details" backTo={`/result/${record.id}`} backLabel="Result" />
      <div className="details__grid">
        <div className="details__aside">
          <ProductImage tone={product.imageTone} label={product.name} />
          <StatusBadge status={record.status} />
        </div>
        <div className="details__main">
          <div>
            <h2 className="details__name">{product.name}</h2>
            {product.variant && <p className="details__variant">{product.variant}</p>}
          </div>

          <section aria-labelledby="d-product">
            <h3 id="d-product" className="section-title">Product</h3>
            <FactList
              items={[
                { label: 'Category', value: product.category, icon: 'tag' },
                { label: 'Manufacturer', value: product.manufacturer, icon: 'building' },
                { label: 'Barcode number', value: product.gtin, icon: 'barcode' },
              ]}
            />
          </section>

          {nafdac && (
            <section aria-labelledby="d-reg">
              <h3 id="d-reg" className="section-title">NAFDAC registration</h3>
              <FactList
                items={[
                  { label: 'NAFDAC number', value: nafdac.number, strong: true },
                  { label: 'Status', value: nafdac.status === 'active' ? 'Active' : nafdac.status },
                  { label: 'Product type', value: nafdac.productType },
                  { label: 'Registered on', value: nafdac.registeredOn && formatDate(nafdac.registeredOn), icon: 'calendar' },
                  { label: 'Valid until', value: nafdac.expiresOn && formatDate(nafdac.expiresOn), icon: 'calendar' },
                ]}
              />
            </section>
          )}

          <section aria-labelledby="d-check">
            <h3 id="d-check" className="section-title">This check</h3>
            <FactList
              items={[
                { label: identifierLabel(identifier.type) + ' scanned', value: identifier.value },
                { label: 'Verified', value: formatDateTime(record.checkedAt), icon: 'clock' },
                { label: 'Data source', value: record.source.label, icon: 'info' },
              ]}
            />
          </section>

          <Button to="/scan" icon="scan">Check another product</Button>
        </div>
      </div>
      <Disclaimer />
    </div>
  );
}
