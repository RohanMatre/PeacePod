{/* Pricing / Plans */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="heading heading--lg text--center mb-md">
            Pricing & Plans
          </div>
          <div className="price-cards">
            <PriceCard
              title="Pay-as-you-go"
              price="$8/hr"
              desc="Flexible, no commitment."
              features={["Book anytime", "Cancel anytime", "All pod features"]}
            />
            <PriceCard
              title="Monthly"
              price="$99/mo"
              desc="Best for regulars. Unlimited sessions."
              features={[
                "Unlimited access",
                "Priority booking",
                "Member perks",
              ]}
              highlight
            />
            <PriceCard
              title="Enterprise"
              price="Contact Us"
              desc="For teams & organizations."
              features={["Custom pods", "On-site setup", "Dedicated support"]}
            />
          </div>
        </div>
      </section>