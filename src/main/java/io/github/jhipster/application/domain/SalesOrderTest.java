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
 * A SalesOrderTest.
 */
@Entity
@Table(name = "sales_order_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "salesordertest")
public class SalesOrderTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name = "info")
    private String info;

    @Column(name = "date_modified")
    private Instant dateModified;

    @OneToOne
    @JoinColumn(unique = true)
    private Category category;

    @OneToOne
    @JoinColumn(unique = true)
    private TestType testType;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sales_order_test_test_tag",
               joinColumns = @JoinColumn(name="sales_order_tests_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="test_tags_id", referencedColumnName="id"))
    private Set<TestTag> testTags = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sales_order_test_parameter",
               joinColumns = @JoinColumn(name="sales_order_tests_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="parameters_id", referencedColumnName="id"))
    private Set<Parameter> parameters = new HashSet<>();

    @ManyToMany(mappedBy = "salesOrderTests")
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

    public Boolean isActive() {
        return active;
    }

    public SalesOrderTest active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public SalesOrderTest name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public SalesOrderTest code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getInfo() {
        return info;
    }

    public SalesOrderTest info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Instant getDateModified() {
        return dateModified;
    }

    public SalesOrderTest dateModified(Instant dateModified) {
        this.dateModified = dateModified;
        return this;
    }

    public void setDateModified(Instant dateModified) {
        this.dateModified = dateModified;
    }

    public Category getCategory() {
        return category;
    }

    public SalesOrderTest category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public TestType getTestType() {
        return testType;
    }

    public SalesOrderTest testType(TestType testType) {
        this.testType = testType;
        return this;
    }

    public void setTestType(TestType testType) {
        this.testType = testType;
    }

    public Set<TestTag> getTestTags() {
        return testTags;
    }

    public SalesOrderTest testTags(Set<TestTag> testTags) {
        this.testTags = testTags;
        return this;
    }

    public SalesOrderTest addTestTag(TestTag testTag) {
        this.testTags.add(testTag);
        testTag.getSalesOrderTests().add(this);
        return this;
    }

    public SalesOrderTest removeTestTag(TestTag testTag) {
        this.testTags.remove(testTag);
        testTag.getSalesOrderTests().remove(this);
        return this;
    }

    public void setTestTags(Set<TestTag> testTags) {
        this.testTags = testTags;
    }

    public Set<Parameter> getParameters() {
        return parameters;
    }

    public SalesOrderTest parameters(Set<Parameter> parameters) {
        this.parameters = parameters;
        return this;
    }

    public SalesOrderTest addParameter(Parameter parameter) {
        this.parameters.add(parameter);
        parameter.getSalesOrderTests().add(this);
        return this;
    }

    public SalesOrderTest removeParameter(Parameter parameter) {
        this.parameters.remove(parameter);
        parameter.getSalesOrderTests().remove(this);
        return this;
    }

    public void setParameters(Set<Parameter> parameters) {
        this.parameters = parameters;
    }

    public Set<SalesOrder> getSalesOrders() {
        return salesOrders;
    }

    public SalesOrderTest salesOrders(Set<SalesOrder> salesOrders) {
        this.salesOrders = salesOrders;
        return this;
    }

    public SalesOrderTest addSalesOrder(SalesOrder salesOrder) {
        this.salesOrders.add(salesOrder);
        salesOrder.getSalesOrderTests().add(this);
        return this;
    }

    public SalesOrderTest removeSalesOrder(SalesOrder salesOrder) {
        this.salesOrders.remove(salesOrder);
        salesOrder.getSalesOrderTests().remove(this);
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
        SalesOrderTest salesOrderTest = (SalesOrderTest) o;
        if (salesOrderTest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesOrderTest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesOrderTest{" +
            "id=" + getId() +
            ", active='" + isActive() + "'" +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", info='" + getInfo() + "'" +
            ", dateModified='" + getDateModified() + "'" +
            "}";
    }
}
