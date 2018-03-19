package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Parameter.
 */
@Entity
@Table(name = "parameter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "parameter")
public class Parameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "name")
    private String name;

    @Column(name = "info")
    private String info;

    @Column(name = "min_value")
    private Double minValue;

    @Column(name = "max_value")
    private Double maxValue;

    @OneToOne
    @JoinColumn(unique = true)
    private ParameterType parameterType;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "parameter_parameter_option",
               joinColumns = @JoinColumn(name="parameters_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="parameter_options_id", referencedColumnName="id"))
    private Set<ParameterOption> parameterOptions = new HashSet<>();

    @ManyToMany(mappedBy = "parameters")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SalesOrderTest> salesOrderTests = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isActive() {
        return active;
    }

    public Parameter active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public Parameter name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInfo() {
        return info;
    }

    public Parameter info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Double getMinValue() {
        return minValue;
    }

    public Parameter minValue(Double minValue) {
        this.minValue = minValue;
        return this;
    }

    public void setMinValue(Double minValue) {
        this.minValue = minValue;
    }

    public Double getMaxValue() {
        return maxValue;
    }

    public Parameter maxValue(Double maxValue) {
        this.maxValue = maxValue;
        return this;
    }

    public void setMaxValue(Double maxValue) {
        this.maxValue = maxValue;
    }

    public ParameterType getParameterType() {
        return parameterType;
    }

    public Parameter parameterType(ParameterType parameterType) {
        this.parameterType = parameterType;
        return this;
    }

    public void setParameterType(ParameterType parameterType) {
        this.parameterType = parameterType;
    }

    public Set<ParameterOption> getParameterOptions() {
        return parameterOptions;
    }

    public Parameter parameterOptions(Set<ParameterOption> parameterOptions) {
        this.parameterOptions = parameterOptions;
        return this;
    }

    public Parameter addParameterOption(ParameterOption parameterOption) {
        this.parameterOptions.add(parameterOption);
        parameterOption.getParameters().add(this);
        return this;
    }

    public Parameter removeParameterOption(ParameterOption parameterOption) {
        this.parameterOptions.remove(parameterOption);
        parameterOption.getParameters().remove(this);
        return this;
    }

    public void setParameterOptions(Set<ParameterOption> parameterOptions) {
        this.parameterOptions = parameterOptions;
    }

    public Set<SalesOrderTest> getSalesOrderTests() {
        return salesOrderTests;
    }

    public Parameter salesOrderTests(Set<SalesOrderTest> salesOrderTests) {
        this.salesOrderTests = salesOrderTests;
        return this;
    }

    public Parameter addSalesOrderTest(SalesOrderTest salesOrderTest) {
        this.salesOrderTests.add(salesOrderTest);
        salesOrderTest.getParameters().add(this);
        return this;
    }

    public Parameter removeSalesOrderTest(SalesOrderTest salesOrderTest) {
        this.salesOrderTests.remove(salesOrderTest);
        salesOrderTest.getParameters().remove(this);
        return this;
    }

    public void setSalesOrderTests(Set<SalesOrderTest> salesOrderTests) {
        this.salesOrderTests = salesOrderTests;
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
        Parameter parameter = (Parameter) o;
        if (parameter.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parameter.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Parameter{" +
            "id=" + getId() +
            ", active='" + isActive() + "'" +
            ", name='" + getName() + "'" +
            ", info='" + getInfo() + "'" +
            ", minValue=" + getMinValue() +
            ", maxValue=" + getMaxValue() +
            "}";
    }
}
