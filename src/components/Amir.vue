<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="main-button-list">
      <b-btn v-b-toggle.collapse1 variant="primary">Toggle Collapse</b-btn>
      <b-collapse id="collapse1" class="mt-2">
        <div class="button-list">
          <button class="btn">Poission</button>
          <button class="btn">Normal</button>
          <button class="btn">Normal</button>
          <button class="btn">Normal</button>
          <button class="btn">Normal</button>
        </div>
      </b-collapse>
      <b-btn v-b-toggle.collapse2 variant="primary">Toggle Collapse</b-btn>
      <b-collapse id="collapse2" class="mt-2">
        <div class="button-list">
          <button v-for="d in distributions"> {{ d }} </button>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Amir",
  props: {
    msg: String
  },
  data: function() {
    return {
      distributions: [
        "Autoregressive",
        "BatchReshape",
        "Bernoulli",
        "Beta",
        "Binomial",
        "Categorical",
        "Cauchy",
        "Gamma",
        "ConditionalDistribution",
        "TransformedDistribution",
        "_BaseDeterministic",
        "_BaseDeterministic",
        "Dirichlet",
        "DirichletMultinomial",
        "GammaGamma",
        "Normal",
        "Geometric",
        "Uniform",
        "HalfCauchy",
        "HalfNormal",
        "Independent",
        "InverseGamma",
        "InverseGaussian",
        "Laplace",
        "LinearGaussianStateSpaceModel",
        "LKJ",
        "Logistic",
        "Mixture",
        "MixtureSameFamily",
        "Multinomial",
        "MultivariateStudentTLinearOperator",
        "NegativeBinomial",
        "OneHotCategorical",
        "Pareto",
        "Poisson",
        "PoissonLogNormalQuadratureCompound",
        "QuantizedDistribution",
        "ExpRelaxedOneHotCategorical",
        "StudentT",
        "TruncatedNormal",
        "VectorDiffeomixture",
        "VonMises",
        "VonMisesFisher",
        "_WishartLinearOperator",
        "Chi2",
        "Exponential",
        "Chi2WithAbsDf",
        "ConditionalTransformedDistribution",
        "ConditionalTransformedDistribution",
        "MultivariateNormalLinearOperator",
        "Gumbel",
        "Kumaraswamy",
        "LogNormal",
        "RelaxedBernoulli",
        "RelaxedOneHotCategorical",
        "SinhArcsinh",
        "VectorExponentialLinearOperator",
        "VectorLaplaceLinearOperator",
        "VectorSinhArcsinhDiag",
        "GaussianProcess",
        "GaussianProcessRegressionModel",
        "MultivariateNormalTriL",
        "MultivariateNormalDiag",
        "MultivariateNormalDiagPlusLowRank",
        "MultivariateNormalFullCovariance",
        "MultivariateNormalDiagWithSoftplusScale",
        "VectorExponentialDiag",
        "VectorLaplaceDiag",
        "Deterministic",
        "VectorDeterministic",
        "InverseGammaWithSoftplusConcentrationRate",
        "LocalLinearTrendStateSpaceModel",
        "SeasonalStateSpaceModel",
        "AdditiveStateSpaceModel",
        "Wishart"
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  border: 2px solid pink;
}

.main-button-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  scroll-behavior: auto;
  overflow: scroll;
}

.button-list {
  display: grid;
  grid-template-columns: 1fr;
  background-color: blueviolet;
  border: 10px solid black;
  scroll-behavior: auto;
  overflow: scroll;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
