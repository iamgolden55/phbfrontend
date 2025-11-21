import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const MastitisPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Breast health', url: '/womens-health/breast-health' },
              { label: 'Mastitis', url: '/womens-health/breast-health/mastitis' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Mastitis</h1>
          <p className="text-xl font-medium">
            Understanding breast inflammation and infection during breastfeeding
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About mastitis</h2>
              <p className="mb-4">
                Mastitis is inflammation of the breast tissue that sometimes involves an infection.
                It most commonly affects breastfeeding women (lactation mastitis), usually in the
                first 3 months after giving birth.
              </p>
              <p>
                While mastitis can be painful and make you feel unwell, it can usually be treated
                effectively. You can continue breastfeeding - in fact, breastfeeding helps clear
                the infection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
              <p className="mb-4">
                Mastitis usually affects one breast and symptoms can develop quickly:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A red, swollen area on your breast that feels hot and painful to touch</li>
                <li>A wedge-shaped area of redness on the breast</li>
                <li>Burning pain in the breast, which may be constant or while breastfeeding</li>
                <li>Feeling generally unwell (flu-like symptoms)</li>
                <li>Fever (temperature of 38°C or above)</li>
                <li>Chills</li>
                <li>Breast tenderness or warmth</li>
                <li>Fatigue</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Causes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Milk not draining properly</h3>
                  <p className="text-sm">
                    When milk stays in the breast (milk stasis), it can cause inflammation.
                    This may happen if:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                    <li>Baby isn't attaching to the breast properly</li>
                    <li>Baby has problems sucking</li>
                    <li>Infrequent feeds or missed feeds</li>
                    <li>Favouring one breast over the other</li>
                    <li>Pressure on the breast (tight bra, seat belt, sleeping position)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Bacterial infection</h3>
                  <p className="text-sm">
                    Bacteria can enter through a cracked or sore nipple and cause infection.
                    Staphylococcus aureus is the most common cause.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Risk factors</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Sore or cracked nipples</li>
                    <li>Previous mastitis</li>
                    <li>Using only one position for breastfeeding</li>
                    <li>Wearing a tight-fitting bra</li>
                    <li>Poor nutrition or fatigue</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Self-care measures</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Continue breastfeeding or expressing milk frequently</li>
                    <li>Feed from the affected breast first when baby is most hungry</li>
                    <li>Ensure baby is properly attached</li>
                    <li>Apply warm compresses before feeding</li>
                    <li>Massage the breast gently while feeding</li>
                    <li>Apply cold compresses after feeding to reduce pain</li>
                    <li>Rest as much as possible</li>
                    <li>Drink plenty of fluids</li>
                    <li>Take paracetamol or ibuprofen for pain and fever</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Antibiotics</h3>
                  <p className="text-sm">
                    If symptoms don't improve within 12-24 hours, or if you have a fever,
                    you may need antibiotics. Complete the full course even if you feel better.
                    Most antibiotics are safe during breastfeeding.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Breast abscess</h3>
                  <p className="text-sm">
                    If an abscess develops (a collection of pus), it may need to be drained
                    with a needle or small incision. This is rare if mastitis is treated promptly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Prevention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensure your baby attaches well to your breast</li>
                <li>Let your baby empty one breast before offering the other</li>
                <li>Change breastfeeding positions</li>
                <li>Feed your baby on demand</li>
                <li>Avoid missing feeds</li>
                <li>Avoid tight bras and clothing</li>
                <li>If using a breast pump, ensure correct technique</li>
                <li>Manage cracked nipples promptly</li>
                <li>Wean gradually when ready</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">When to see a doctor</h3>
              <p className="text-sm mb-4">
                See a doctor urgently if:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Symptoms don't improve after 12-24 hours of self-care</li>
                <li>You have a high fever</li>
                <li>You feel very unwell</li>
                <li>There's pus or blood in your breast milk</li>
                <li>You see red streaks on the breast</li>
                <li>You have a hard, painful lump that doesn't improve</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-700">Keep breastfeeding</h3>
              <p className="text-sm mb-4">
                It's safe and important to continue breastfeeding with mastitis:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Your milk is safe for your baby</li>
                <li>Emptying the breast helps clear the infection</li>
                <li>Stopping can make mastitis worse</li>
                <li>Antibiotics are usually breastfeeding-safe</li>
              </ul>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Getting support</h3>
              <p className="text-sm mb-4">
                If you're having breastfeeding problems:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Ask your midwife or health visitor</li>
                <li>See a lactation consultant</li>
                <li>Contact a breastfeeding support group</li>
                <li>Visit a breastfeeding clinic</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Non-lactation mastitis</h3>
              <p className="text-sm mb-4">
                Mastitis can sometimes occur in women who are not breastfeeding:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Often linked to smoking</li>
                <li>May be related to nipple piercings</li>
                <li>Can affect women of any age</li>
                <li>Treatment is similar but may need different antibiotics</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/breast-health/breast-pain" className="text-[#d8157d] hover:underline">
                    Breast pain
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health/benign-lumps" className="text-[#d8157d] hover:underline">
                    Benign breast lumps
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/breast-health" className="text-[#d8157d] hover:underline">
                    Breast health overview
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-blue-700">Sources</h3>
              <ul className="text-sm space-y-2">
                <li>World Health Organization (WHO)</li>
                <li>La Leche League International</li>
                <li>Academy of Breastfeeding Medicine</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastitisPage;
