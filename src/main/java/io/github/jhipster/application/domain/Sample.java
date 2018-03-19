package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Sample.
 */
@Entity
@Table(name = "sample")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "sample")
public class Sample implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "batch")
    private String batch;

    @Column(name = "date_sampling")
    private Instant dateSampling;

    @Column(name = "sampling_location")
    private String samplingLocation;

    @Column(name = "info")
    private String info;

    @ManyToMany(mappedBy = "samples")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SalesOrder> salesOrders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Sample name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBatch() {
        return batch;
    }

    public Sample batch(String batch) {
        this.batch = batch;
        return this;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public Instant getDateSampling() {
        return dateSampling;
    }

    public Sample dateSampling(Instant dateSampling) {
        this.dateSampling = dateSampling;
        return this;
    }

    public void setDateSampling(Instant dateSampling) {
        this.dateSampling = dateSampling;
    }

    public String getSamplingLocation() {
        return samplingLocation;
    }

    public Sample samplingLocation(String samplingLocation) {
        this.samplingLocation = samplingLocation;
        return this;
    }

    public void setSamplingLocation(String samplingLocation) {
        this.samplingLocation = samplingLocation;
    }

    public String getInfo() {
        return info;
    }

    public Sample info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<SalesOrder> getSalesOrders() {
        return salesOrders;
    }

    public Sample salesOrders(Set<SalesOrder> salesOrders) {
        this.salesOrders = salesOrders;
        return this;
    }

    public Sample addSalesOrder(SalesOrder salesOrder) {
        this.salesOrders.add(salesOrder);
        salesOrder.getSamples().add(this);
        return this;
    }

    public Sample removeSalesOrder(SalesOrder salesOrder) {
        this.salesOrders.remove(salesOrder);
        salesOrder.getSamples().remove(this);
        return this;
    }

    public void setSalesOrders(Set<SalesOrder> salesOrders) {
        this.salesOrders = salesOrders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Sample sample = (Sample) o;
        if (sample.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sample.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sample{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", batch='" + getBatch() + "'" +
            ", dateSampling='" + getDateSampling() + "'" +
            ", samplingLocation='" + getSamplingLocation() + "'" +
            ", info='" + getInfo() + "'" +
            "}";
    }
}
